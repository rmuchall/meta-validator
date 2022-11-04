import t from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsMinLength} from "../../src/decorators/property/IsMinLength.js";

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

t.beforeEach(MetaValidator.clearMetadata);

void t.test("decorators.IsMinLength() valid values", async t => {
    class Widget {
        @IsMinLength(5)
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0,`value = ${value}`);
    }
});

void t.test("decorators.IsMinLength() invalid values", async t => {
    class Widget {
        @IsMinLength(5)
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
