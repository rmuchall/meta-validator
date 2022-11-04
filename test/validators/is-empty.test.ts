import t from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isEmpty} from "../../src/validators/is-empty.js";
import {IsEmpty} from "../../src/decorators/property/IsEmpty.js";

const validValues: any[] = [
    1234,
    true,
    false,
    "",
    {},
    undefined,
    null
];

const invalidValues: any[] = [
    "xxx",
    {test: 1234}
];

t.beforeEach(MetaValidator.clearMetadata);

void t.test("functions.isEmpty() valid values", t => {
    for (const value of validValues) {
        if (!isEmpty(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isEmpty(value), `value = ${value}`);
    }

    t.end();
});

void t.test("functions.isEmpty() invalid values", t => {
    for (const value of invalidValues) {
        if (isEmpty(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isEmpty(value), `value = ${value}`);
    }

    t.end();
});

void t.test("decorators.IsEmpty() valid values", async t => {
    class Widget {
        @IsEmpty()
        name: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void t.test("decorators.IsEmpty() invalid values", async t => {
    class Widget {
        @IsEmpty()
        name: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
