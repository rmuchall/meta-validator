import t from "tap";
import {IsAlpha, IsValid, MetaValidator} from "../src/index.js";

t.beforeEach(MetaValidator.clearMetadata);

void t.test("validate abstract properties", async t => {
    abstract class CoreWidget {
        @IsValid()
        test: string;
    }

    abstract class BaseWidget extends CoreWidget {
        @IsAlpha()
        id: string;

        @IsValid()
        created: string;
    }

    class Widget extends BaseWidget {
        @IsValid()
        name: string;

        @IsValid()
        color: string;

        @IsValid()
        model: number;
    }

    const widget = Object.assign<Widget, Widget>(new Widget(), {
        test: "this is a test",
        id: "xxx-1234-yyy",
        created: "01/01/00",
        name: "Doodad",
        color: "Blue",
        model: 1234
    });

    const validationErrors = await new MetaValidator().validate(widget, {isSkipUndefinedValues: true});
    t.equal(Object.keys(validationErrors).length, 1);
});
