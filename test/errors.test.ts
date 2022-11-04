import t from "tap";
import {MetaValidator} from "../src/MetaValidator.js";
import {IsString} from "../src/decorators/property/IsString.js";
import {IsNested} from "../src/decorators/property/IsNested.js";
import {IsNumber} from "../src/decorators/property/IsNumber.js";

t.beforeEach(MetaValidator.clearMetadata);

void t.test("validate non-object: undefined", async t => {
    await t.rejects(new MetaValidator().validate(undefined as any));
});

void t.test("validate non-object: null", async t => {
    await t.rejects(new MetaValidator().validate(null as any));
});

void t.test("validate non-object: string", async t => {
    await t.rejects(() => new MetaValidator().validate("test" as any));
});

void t.test("no metadata", async t => {
    class Widget {
        name: string;
    }

    await t.rejects(new MetaValidator().validate(new Widget()));
});

void t.test("throw error", async t => {
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

    await t.rejects(new MetaValidator().validate(Object.assign<Widget, Widget>(new Widget(), {name: "this is a test"})));
});

void t.test("extraneous properties", async t => {
    class Widget {
        @IsString()
        name: string;
    }

    const widget: Widget = new Widget();
    widget.name = "test";
    (widget as any).extra = "extra";
    await t.rejects(new MetaValidator().validate(widget));
});

void t.test("proto vulnerability", async t => {
    class Widget {
        @IsString()
        name: string;
    }

    const widget: Widget = new Widget();
    widget.name = "test";
    (widget as any).__proto__ = {
        // Empty
    };

    await t.rejects(new MetaValidator().validate(widget));
});

void t.test("circular dependencies", async t => {
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
    await t.rejects(new MetaValidator().validate(widget));
});
