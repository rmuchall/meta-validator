import {MetaValidator} from "../src/MetaValidator";
import {IsString} from "../src/decorators/property/IsString";
import {IsNested} from "../src/decorators/property/IsNested";
import {IsNumber} from "../src/decorators/property/IsNumber";

beforeEach(MetaValidator.clearMetadata);

test("validate non-object: undefined", () => {
    class Widget {
        @IsString()
        name: string;
    }

    expect(async () => {
        await MetaValidator.validate(undefined as any);
    }).rejects.toThrow();
});

test("validate non-object: null", () => {
    class Widget {
        @IsString()
        name: string;
    }

    expect(async () => {
        await MetaValidator.validate(null as any);
    }).rejects.toThrow();
});

test("validate non-object: string", () => {
    class Widget {
        @IsString()
        name: string;
    }

    expect(async () => {
        await MetaValidator.validate("test" as any);
    }).rejects.toThrow();
});

test("no metadata", () => {
    class Widget {
        name: string;
    }

    expect(async () => {
        const widget = new Widget();
        await MetaValidator.validate(widget);
    }).rejects.toThrow();
});

test("throw error", () => {
    function ThrowError(): Function {
        return function (target: Object, propertyKey: string | symbol): void {
            MetaValidator.addMetadata({
                // Metadata
                target: target,
                propertyKey: propertyKey.toString(),
                // Context
                className: target.constructor.name,
                validator: {
                    message: "this is a test validation message",
                    method: async (input: any) => {
                        throw new Error("ThrowError decorator");
                    }
                }
            });
        };
    }

    class Widget {
        @ThrowError()
        name: string;
    }

    expect(async () => {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "this is a test"});
        const validationErrors = await MetaValidator.validate(widget);
    }).rejects.toThrow();
});

test("extraneous properties", () => {
    class Widget {
        @IsString()
        name: string;
    }

    const widget: Widget = new Widget();
    widget.name = "test";
    (widget as any).extra = "extra";

    expect(async () => {
        await MetaValidator.validate(widget);
    }).rejects.toThrow();
});

test("proto vulnerability", () => {
    class Widget {
        @IsString()
        name: string;
    }

    const widget: Widget = new Widget();
    widget.name = "test";
    (widget as any).__proto__ = {
        // Empty
    };

    expect(async () => {
        await MetaValidator.validate(widget);
    }).rejects.toThrow();
});

test("circular dependencies", () => {
    class WidgetDetail {
        @IsString()
        material: string;

        @IsString()
        shape: string;

        @IsNested()
        circular: WidgetDetail;
    }

    class Widget {
        @IsString()
        name: string;

        @IsString()
        color: string;

        @IsNumber()
        model: number;

        @IsNested()
        detail: WidgetDetail;
    }

    const widget = Object.assign(new Widget(), {
        name: "Doodad",
        color: "Blue",
        model: 1234
    });
    const widgetDetail = Object.assign(new WidgetDetail(), {
        material: "Plastic",
        shape: "Square"
    });
    widget.detail = widgetDetail;
    widget.detail.circular = widgetDetail;

    expect(async () => {
        await MetaValidator.validate(widget);
    }).rejects.toThrow();
});
