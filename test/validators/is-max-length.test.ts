import {MetaValidator} from "../../src/MetaValidator";
import {IsMaxLength} from "../../src/decorators/property/IsMaxLength";

const validValues: any[] = [
    "a",
    "aa",
    "aaa",
    String("aaaa")
];

const invalidValues: any[] = [
    42,
    true,
    "aaaaaa",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsMaxLength() valid values", async () => {
    class Widget {
        @IsMaxLength(5)
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsMaxLength() invalid values", async () => {
    class Widget {
        @IsMaxLength(5)
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
