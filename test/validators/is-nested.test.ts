import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsString} from "../../src/decorators/property/IsString.js";
import {IsNested} from "../../src/decorators/property/IsNested.js";
import {ValidationErrors} from "../../src/interfaces/ValidationErrors.js";

const validValues: any[] = [
    "abc",
    "ABC",
    "FoObar",
    "",
    String("test")
];

const invalidValues: any[] = [
    42,
    true,
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

void test("decorators.IsNested() valid values", async t => {
    class WidgetColor {
        @IsString()
        color: string;
    }

    class WidgetMaterial {
        @IsString()
        material: string;

        @IsNested()
        widgetColor: WidgetColor;
    }

    class Widget {
        @IsString()
        name: string;

        @IsNested()
        widgetMaterial: WidgetMaterial;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {
            name: value,
            widgetMaterial: Object.assign<WidgetMaterial, WidgetMaterial>(new WidgetMaterial(), {
                material: value,
                widgetColor: Object.assign<WidgetColor, WidgetColor>(new WidgetColor(), {
                    color: value
                })
            })
        });
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("decorators.IsNested() invalid values", async t => {
    class WidgetColor {
        @IsString()
        color: string;
    }

    class WidgetMaterial {
        @IsString()
        material: string;

        @IsNested()
        widgetColor: WidgetColor;
    }

    class Widget {
        @IsString()
        name: string;

        @IsNested()
        widgetMaterial: WidgetMaterial;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {
            name: value,
            widgetMaterial: Object.assign<WidgetMaterial, WidgetMaterial>(new WidgetMaterial(), {
                material: value,
                widgetColor: Object.assign<WidgetColor, WidgetColor>(new WidgetColor(), {
                    color: value
                })
            })
        });
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 2);
        t.equal(Object.keys(validationErrors["widgetMaterial"]).length, 2);
        t.equal(Object.keys((validationErrors["widgetMaterial"] as ValidationErrors)["widgetColor"]).length, 1);
    }
});
