import {MetaValidator} from "../../src/MetaValidator";
import {IsString} from "../../src/decorators/property/IsString";
import {IsNotEqualTo} from "../../src/decorators/property/IsNotEqualTo";

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsNotEqualTo() valid value", async () => {
    class Widget {
        @IsString()
        topColor: string;

        @IsNotEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Red"});
    const validationErrors = await new MetaValidator().validate(widget);
    expect(Object.keys(validationErrors).length).toBe(0);
});

test("decorators.IsNotEqualTo() invalid value", async () => {
    class Widget {
        @IsString()
        topColor: string;

        @IsNotEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Blue"});
    const validationErrors = await new MetaValidator().validate(widget);
    expect(Object.keys(validationErrors).length).toBe(1);
});

