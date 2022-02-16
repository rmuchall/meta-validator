![GitHub](https://img.shields.io/github/license/rmuchall/meta-validator)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/meta-validator)
![npm](https://img.shields.io/npm/v/meta-validator)
## What is meta-validator?
meta-validator is a light-weight ([3k gzipped](https://bundlephobia.com/package/meta-validator@0.0.55)), tree-shakable, zero dependency validation library that uses [TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) to define validation rules on your classes. It is isomorphic and can be used in NodeJs or in a browser.

```
export class Widget {
    @IsNotEmpty()
    @IsAlphanumeric()
    name: string;

    @IsEmail()
    email: string;
}

const myWidget = new Widget();
widget.name = "abc1234";
widget.email = "myemail@test.com";
const validationErrors = await new MetaValidator().validate(myWidget);
```

## Installation
Install the [meta-validator package](https://www.npmjs.com/package/meta-validator) from npm. <br/>
`npm install meta-validator`

## Validation Errors
If an object fails validation then meta-validator returns a ValidationError object with the following structure.:<br/>
`<property>:[<array of validation error messages>]`<br/>
Example:<br/>
`{ email: [ 'email must be a valid email address.' ] }`

### Custom Validation Error Messages
You can provide custom error messages by using the `customErrorMessages` option.<br/>
```
const validationErrors = await new MetaValidator().validate(widget, {
    customErrorMessages: {
        "IsEqualTo": "$propertyKey must be equal to $option0"
    }
});
```
When using custom error messages you can use the following text replacement codes:<br/>

| Identifier      | Description                                           | 
|-----------------|-------------------------------------------------------|
| $propertyKey    | The property key that is being validated              |
| $propertyValue  | The value of the property that is being validated     | 
| $option<number> | Any options that are passed to the validator function |

### Custom Message Formatter

If you require total control over validation error messages you can supply a custom message formatter.<br/>
```
const validationErrors = await new MetaValidator().validate(widget, {
    customErrorMessageFormatter: (data: FormatterData) => {
        let errorMessage = data.message;
        errorMessage = errorMessage.replace("$propertyKey", sentenceCase(data.propertyKey));
        errorMessage = errorMessage.replace("$propertyValue", data.propertyValue);
    
        if (data.options) {
            for (let i = 0; i < data.options.length; i++) {
                errorMessage = errorMessage.replace(`$option${i}`, data.options[i]);
            }
        }
    
        return errorMessage;
    }
});
```
The custom formatter automatically includes an object with the following values:<br/>
```
interface FormatterData {
    decoratorName: string;   // The decorator name e.g. IsBoolean()
    message: string;         // The validation error message
    propertyKey: string;     // The key of the property to be validated
    propertyValue: string;   // The value of the property to be validated
    options?: any[];         // Any options passed to the validator function
}
```

## Skip Missing Properties
If you wish to validate an object but skip any missing properties you can use the following option.<br/>
```
const validationErrors = await new MetaValidator().validate(widget, {isSkipMissingProperties: true});
```

## All Available Decorators

| Decorator                | Description                                               | 
|--------------------------|-----------------------------------------------------------|
| IsAlpha()                | Only contains letters                                     |
| IsAlphanumeric()         | Only contains letters or numbers                          |
| IsBoolean()              | Is of type boolean                                        |
| IsEmail()                | Is a valid email address                                  |    
| IsEmpty()                | Is null, undefined, an empty string or object             |   
| IsEqualTo(<property>)    | Is equal to specified property                            |     
| IsFqDn()                 | Is a fully qualified domain name (URL)                    |   
| IsIp()                   | Is a valid v4 or v6 IP address                            |   
| IsMaxLength()            | Has a max length of x                                     | 
| IsMinLength()            | Has a minimum length of x                                 |                    
| IsNested()               | Also validate decorated child object                      |
| IsNotEmpty()             | Is not null, undefined, an empty string or object         |
| IsNotEqualTo(<property>) | Is not equal to specified property                        |
| IsNumber()               | Is of type number                                         |  
| IsRegEx()                | Is of type Regex (regular expression)                     |    
| IsString()               | Is of type string                                         |   
| IsUrl()                  | Is a valid URL (uniform resource locator)                 |  
| IsValid()                | Property is always valid (useful for skipping validation) |   
