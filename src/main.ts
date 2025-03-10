import { Checkr, ValidationResult } from '@jacksierkstra/checkr';

const main = async () => {
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
  const { valid, errors } : ValidationResult = await validator.validate(xml, xsd);
  
  console.log('Valid: ', valid);
  console.log('Errors: ', errors);
};

main();