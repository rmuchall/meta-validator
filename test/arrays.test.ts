import {test, beforeEach} from "tap";
import {MetaValidator} from "../src/MetaValidator.js";
import {IsString} from "../src/decorators/property/IsString.js";
import {IsNested} from "../src/decorators/property/IsNested.js";

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

void test("Arrays valid values", async t => {
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

    const widgetArray: Widget[] = [];
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
        widgetArray.push(widget);
    }

    const validationErrorArray = await new MetaValidator().validate(widgetArray);
    for (const validationError of validationErrorArray) {
        t.equal(Object.keys(validationError).length, 0);
    }
});

void test("Arrays invalid values", async t => {
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

    const widgetArray: Widget[] = [];
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
        widgetArray.push(widget);
    }

    const validationErrorArray = await new MetaValidator().validate(widgetArray);
    for (const validationError of validationErrorArray) {
        t.equal(Object.keys(validationError).length, 2);
    }
});
