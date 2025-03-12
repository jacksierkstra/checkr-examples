import { Checkr, ValidationResult } from '@jacksierkstra/checkr';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { logResult } from './utils';

export const simple = async () => {
    const xml = `<root><element>Value</element></root>`;
    const xsd = `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
                  <xs:element name="root">
                    <xs:complexType>
                      <xs:sequence>
                        <xs:element name="element" type="xs:string"/>
                      </xs:sequence>
                    </xs:complexType>
                  </xs:element>
                </xs:schema>`;

    const validator = new Checkr();
    const result: ValidationResult = await validator.validate(xml, xsd);
    logResult('Simple', result);
};

/**
 * source: https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms764613(v=vs.85)
 * This example attempts to validate an XML data file (books.xml) 
 * against an XML schema definition file (books.xsd). According to books.xsd, 
 * each <book> element must have a <pub_date> child element. The second <book> 
 * element in books.xml does not have this required element. Therefore, when 
 * we attempt to validate the XML file , we should get a validation error.
 */
export const books = async () => {
    const xmlPath = (await glob('src/resources/books.xml'))?.at(0);
    const xsdPath = (await glob('src/resources/books.xsd'))?.at(0);
    if (!xmlPath || !xsdPath) {
        throw new Error(`Did not find the xml (${xmlPath}) or xsd path (${xsdPath}).`);
    }
    const xml = (await readFile(xmlPath)).toString();
    const xsd = (await readFile(xsdPath)).toString();
    const validator = new Checkr();
    const result: ValidationResult = await validator.validate(xml, xsd);
    logResult('Books', result);
};