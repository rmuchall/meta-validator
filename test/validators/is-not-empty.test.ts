import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsNotEmpty} from "../../src/decorators/property/IsNotEmpty.js";

const validValues: any[] = [
    "xxx",
    {test: 1234}
];

const invalidValues: any[] = [
    1234,
    true,
    false,
    "",
    {},
    undefined,
    null
];

beforeEach(t => MetaValidator.clearMetadata());

void test("decorators.IsNotEmpty() valid values", async t => {
    class Widget {
        @IsNotEmpty()
        name: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("decorators.IsNotEmpty() invalid values", async t => {
    class Widget {
        @IsNotEmpty()
        name: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
