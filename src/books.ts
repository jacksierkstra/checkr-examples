import { Checkr, ValidationResult } from '@jacksierkstra/checkr';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';

/**
 * source: https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms764613(v=vs.85)
 * This example attempts to validate an XML data file (books.xml) 
 * against an XML schema definition file (books.xsd). According to books.xsd, 
 * each <book> element must have a <pub_date> child element. The second <book> 
 * element in books.xml does not have this required element. Therefore, when 
 * we attempt to validate the XML file , we should get a validation error.
 */
const books = async () => {
    const xmlPath = (await glob('src/resources/books.xml'))?.at(0);
    const xsdPath = (await glob('src/resources/books.xsd'))?.at(0);
    if (!xmlPath || !xsdPath) {
        throw new Error(`Did not find the xml (${xmlPath}) or xsd path (${xsdPath}).`);
    }
    const xml = (await readFile(xmlPath)).toString();
    const xsd = (await readFile(xsdPath)).toString();
    const validator = new Checkr();
    const { valid, errors }: ValidationResult = await validator.validate(xml, xsd);
    console.log('Valid: ', valid);
    console.log('Errors: ', errors);
};

books();