import { ValidationResult } from "@jacksierkstra/checkr";

export const logResult = (name: string, result: ValidationResult) => {
    console.log(`|---------------------------------------------`);
    console.log(`| Ran example with name: ${name}              `);
    console.log(`|---------------------------------------------`);
    console.log(`| Valid: ${result.valid}                      `);
    console.log(`| No. of errors: ${result.errors.length}      `);
    console.log(`|---------------------------------------------`);
    if (result.errors.length > 0) {
        for (let index = 0; index < result.errors.length; index++) {
            const error = result.errors[index];
            console.log('| - ', error);
        }
        console.log(`|---------------------------------------------|`);
    }
    logBlankLine();
};

const logBlankLine = () => {
    console.log('');
};