import {MetaValidator} from "../../src/MetaValidator";
import {IsMinLength} from "../../src/decorators/property/IsMinLength";

const validValues: any[] = [
    "aaaaaaaa",
    "aaaaaaa",
    "aaaaaa",
    String("aaaaa")
];

const invalidValues: any[] = [
    42,
    true,
    "aaa",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsMinLength() valid values", async () => {
    class Widget {
        @IsMinLength(5)
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsMinLength() invalid values", async () => {
    class Widget {
        @IsMinLength(5)
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
