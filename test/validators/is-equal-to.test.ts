import {MetaValidator} from "../../src/MetaValidator";
import {IsString} from "../../src/decorators/property/IsString";
import {IsEqualTo} from "../../src/decorators/property/IsEqualTo";

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsEqualTo() valid value", async () => {
    class Widget {
        @IsString()
        topColor: string;

        @IsEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Blue"});
    const validationErrors = await MetaValidator.validate(widget);
    expect(Object.keys(validationErrors).length).toBe(0);
});

test("decorators.IsEqualTo() invalid value", async () => {
    class Widget {
        @IsString()
        topColor: string;

        @IsEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Red"});
    const validationErrors = await MetaValidator.validate(widget);
    expect(Object.keys(validationErrors).length).toBe(1);
});
