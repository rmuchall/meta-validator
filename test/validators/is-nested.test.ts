import {MetaValidator} from "../../src/MetaValidator";
import {IsString} from "../../src/decorators/property/IsString";
import {IsNested} from "../../src/decorators/property/IsNested";
import {ValidationErrors} from "../../src/interfaces/ValidationErrors";

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

test("decorators.IsNested() valid values", async () => {
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
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsNested() invalid values", async () => {
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
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(2);
        expect(Object.keys(validationErrors["widgetMaterial"]).length).toBe(2);
        expect(Object.keys((validationErrors["widgetMaterial"] as ValidationErrors)["widgetColor"]).length).toBe(1);
    }
});
