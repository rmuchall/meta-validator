import {MetaValidator} from "../src/MetaValidator";
import {IsNotEmpty} from "../src/decorators/property/IsNotEmpty";
import {IsEqualTo} from "../src/decorators/property/IsEqualTo";
import {IsValid} from "../src/decorators/property/IsValid";

const validValues: any[] = [
    "xxx",
    "123",
    {name: "test"}
];

const invalidValues: any[] = [
    true,
    "",
    null,
    undefined
];

beforeEach(MetaValidator.clearMetadata);

test("isSkipMissingProperties valid values", async () => {
    class Widget {
        @IsNotEmpty()
        name: any;

        @IsNotEmpty()
        model?: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget, {isSkipMissingProperties: true});
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("isSkipMissingProperties invalid values", async () => {
    class Widget {
        @IsNotEmpty()
        name: any;

        @IsNotEmpty()
        model?: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget, {isSkipMissingProperties: true});
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});

test("custom validation errors", async () => {
    class Widget {
        @IsValid()
        name: any;

        @IsEqualTo("name")
        sameName: any;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "Doodad", sameName: "Thingymabob"});
    MetaValidator.customValidationMessages = {
        "IsEqualTo": "CUSTOM: $propertyKey must be equal to $options0"
    };
    const validationErrors = await MetaValidator.validate(widget, {isSkipMissingProperties: true});
    expect((validationErrors.sameName as string[])[0]).toBe("CUSTOM: sameName must be equal to name");
});
