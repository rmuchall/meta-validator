import t from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsMaxLength} from "../../src/decorators/property/IsMaxLength.js";

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

t.beforeEach(MetaValidator.clearMetadata);

void t.test("decorators.IsMaxLength() valid values", async t => {
    class Widget {
        @IsMaxLength(5)
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void t.test("decorators.IsMaxLength() invalid values", async t => {
    class Widget {
        @IsMaxLength(5)
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
