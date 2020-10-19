import {MetaValidator} from "../src/MetaValidator";
import {IsString} from "../src/decorators/property/IsString";
import {IsNested} from "../src/decorators/property/IsNested";
import {ValidationErrors} from "../src/interfaces/ValidationErrors";

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

test("Arrays valid values", async () => {
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

    const validationErrorArray = await MetaValidator.validate(widgetArray);
    for (const validationError of validationErrorArray) {
        expect(Object.keys(validationError).length).toBe(0);
    }
});

test("Arrays invalid values", async () => {
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

    const validationErrorArray = await MetaValidator.validate(widgetArray);
    for (const validationError of validationErrorArray) {
        expect(Object.keys(validationError).length).toBe(2);
    }
});
