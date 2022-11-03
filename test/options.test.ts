import {test, beforeEach, only} from "tap";
import {MetaValidator} from "../src/MetaValidator.js";
import {IsNotEmpty} from "../src/decorators/property/IsNotEmpty.js";
import {IsEqualTo} from "../src/decorators/property/IsEqualTo.js";
import {IsValid} from "../src/decorators/property/IsValid.js";

const validValues: any[] = [
    "xxx",
    "123",
    {name: "test"}
];

const invalidValues: any[] = [
    true,
    false,
    "",
    null,
    // undefined indicates a missing property (isSkipUndefinedValues)
];

beforeEach(t => MetaValidator.clearMetadata());

void test("isSkipUndefinedValues valid values", async t => {
    class Widget {
        @IsNotEmpty()
        name: any;

        @IsNotEmpty()
        model?: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget, {isSkipUndefinedValues: true});
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("isSkipUndefinedValues invalid values", async t => {
    class Widget {
        @IsNotEmpty()
        name: any;

        @IsNotEmpty()
        model?: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget, {isSkipUndefinedValues: true});
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});

void test("custom validation errors", async t => {
    class Widget {
        @IsValid()
        name: any;

        @IsEqualTo("name")
        sameName: any;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "Doodad", sameName: "Thingymabob"});
    const validationErrors = await new MetaValidator().validate(widget, {
        isSkipUndefinedValues: true,
        customErrorMessages: {
            "IsEqualTo": "CUSTOM: $propertyKey must be equal to $option0"
        }
    });

    t.equal((validationErrors["sameName"] as string[])[0], "CUSTOM: sameName must be equal to name");
});

void test("custom validation error formatter", async t => {
    class Widget {
        @IsValid()
        name: any;

        @IsEqualTo("name")
        sameName: any;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "Doodad", sameName: "Thingymabob"});
    const validationErrors = await new MetaValidator().validate(widget, {
        isSkipUndefinedValues: true,
        customErrorMessageFormatter: (data) => {
            let errorMessage = data.message;
            errorMessage = errorMessage.replace("$propertyKey", data.propertyKey.toUpperCase());
            errorMessage = errorMessage.replace("$propertyValue", data.propertyValue);

            if (data.options) {
                t.equal(data.decoratorName, "IsEqualTo");
                t.equal(data.message, "CUSTOM: $propertyKey must be equal to $option0");
                t.equal(data.propertyKey, "sameName");
                t.equal(data.propertyValue, "Thingymabob");
                t.equal(data.options[0], "name");

                for (let i = 0; i < data.options.length; i++) {
                    errorMessage = errorMessage.replace(`$option${i}`, data.options[i]);
                }
            }

            return errorMessage;
        },
        customErrorMessages: {
            "IsEqualTo": "CUSTOM: $propertyKey must be equal to $option0"
        }
    });

    t.equal((validationErrors["sameName"] as string[])[0], "CUSTOM: SAMENAME must be equal to name");
});
