import {MetaValidator} from "../src/MetaValidator";
import {IsString} from "../src/decorators/property/IsString";
import {IsNested} from "../src/decorators/property/IsNested";
import {IsNumber} from "../src/decorators/property/IsNumber";

beforeEach(MetaValidator.clearMetadata);

test("validate non-object: undefined", () => {
    void expect(() => {
        return new MetaValidator().validate(undefined as any);
    }).rejects.toThrow();
});

test("validate non-object: null", () => {
    void expect(() => {
        return new MetaValidator().validate(null as any);
    }).rejects.toThrow();
});

test("validate non-object: string", () => {
    void expect(() => {
        return new MetaValidator().validate("test" as any);
    }).rejects.toThrow();
});

test("no metadata", () => {
    class Widget {
        name: string;
    }

    void expect(() => {
        const widget = new Widget();
        return new MetaValidator().validate(widget);
    }).rejects.toThrow();
});

test("throw error", () => {
    function ThrowError(): PropertyDecorator {
        return (target, propertyKey) => {
            MetaValidator.addMetadata({
                // Metadata
                target: target,
                propertyKey: propertyKey.toString(),
                // Context
                className: target.constructor.name,
                validator: {
                    decoratorName: "ThrowError",
                    message: "this is a test validation message",
                    options: [],
                    method: (input: any) => {
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

    void expect(() => {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "this is a test"});
        return new MetaValidator().validate(widget);
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

    void expect(() => {
        return new MetaValidator().validate(widget);
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

    void expect(() => {
        return new MetaValidator().validate(widget);
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

    void expect(() => {
        return new MetaValidator().validate(widget);
    }).rejects.toThrow();
});
