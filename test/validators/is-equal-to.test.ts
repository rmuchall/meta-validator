import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsString} from "../../src/decorators/property/IsString.js";
import {IsEqualTo} from "../../src/decorators/property/IsEqualTo.js";

beforeEach(MetaValidator.clearMetadata);

void test("decorators.IsEqualTo() valid value", async t => {
    class Widget {
        @IsString()
        topColor: string;

        @IsEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Blue"});
    const validationErrors = await new MetaValidator().validate(widget);
    t.equal(Object.keys(validationErrors).length, 0);
});

void test("decorators.IsEqualTo() invalid value", async t => {
    class Widget {
        @IsString()
        topColor: string;

        @IsEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Red"});
    const validationErrors = await new MetaValidator().validate(widget);
    t.equal(Object.keys(validationErrors).length, 1);
});
