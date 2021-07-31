import {MetaValidator} from "../../src/MetaValidator";
import {IsNotEmpty} from "../../src/decorators/property/IsNotEmpty";

const validValues: any[] = [
    "xxx",
    {test: 1234}
];

const invalidValues: any[] = [
    1234,
    true,
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsNotEmpty() valid values", async () => {
    class Widget {
        @IsNotEmpty()
        name: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsNotEmpty() invalid values", async () => {
    class Widget {
        @IsNotEmpty()
        name: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
