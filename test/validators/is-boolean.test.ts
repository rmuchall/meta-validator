import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsBoolean} from "../../src/decorators/property/IsBoolean.js";

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

beforeEach(t => MetaValidator.clearMetadata());

void test("decorators.IsBoolean() valid values", async t => {
    class Widget {
        @IsBoolean()
        isValid: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {isValid: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("decorators.IsBoolean() invalid values", async t => {
    class Widget {
        @IsBoolean()
        isValid: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {isValid: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
