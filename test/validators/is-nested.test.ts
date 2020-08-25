import {MetaValidator} from "../../src/MetaValidator";
import {IsString} from "../../src/decorators/property/IsString";
import {IsNested} from "../../src/decorators/property/IsNested";

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
    class WidgetDetail {
        @IsString()
        material: string;
    }

    class Widget {
        @IsString()
        name: string;

        @IsNested()
        detail: WidgetDetail;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {
            name: value,
            detail: Object.assign<WidgetDetail, WidgetDetail>(new WidgetDetail(), {
                material: value
            })
        });
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsNested() invalid values", async () => {
    class WidgetDetail {
        @IsString()
        material: string;
    }

    class Widget {
        @IsString()
        name: string;

        @IsNested()
        detail: WidgetDetail;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {
            name: value,
            detail: Object.assign<WidgetDetail, WidgetDetail>(new WidgetDetail(), {
                material: value
            })
        });
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(2);
    }
});
