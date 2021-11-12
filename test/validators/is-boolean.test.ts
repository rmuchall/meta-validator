import {MetaValidator} from "../../src/MetaValidator";
import {IsBoolean} from "../../src/decorators/property/IsBoolean";

const validValues: any[] = [
    true,
    false
];

const invalidValues: any[] = [
    "xxx",
    {test: 1234},
    null,
    "",
    123
];

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsBoolean() valid values", async () => {
    class Widget {
        @IsBoolean()
        isValid: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {isValid: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsBoolean() invalid values", async () => {
    class Widget {
        @IsBoolean()
        isValid: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {isValid: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
