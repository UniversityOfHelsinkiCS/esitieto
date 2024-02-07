const KoriInterface = require('./koriInterface');

describe('KoriInterface', () => {
    let kori;

    beforeEach(() => {
        kori = new KoriInterface();
    });

    describe('isValidInput method', () => {
        test('should allow single words with letters', () => {
            expect(kori.isValidInput('Ohjelmoinnin')).toBe(true);
        });

        test('should allow multiple words', () => {
            expect(kori.isValidInput('Ohjelmoinnin Jatkokurssi')).toBe(true);
        });

        test('should allow words with numbers and dashes', () => {
            expect(kori.isValidInput('Kurssi-123')).toBe(true);
        });

        test('should not allow leading or trailing spaces', () => {
            expect(kori.isValidInput(' Ohjelmoinnin')).toBe(false);
            expect(kori.isValidInput('Ohjelmoinnin ')).toBe(false);
            expect(kori.isValidInput('Ohjelmoinnin Jatkokurssi ')).toBe(false);
        });

        test('should not allow multiple consecutive spaces within', () => {
            expect(kori.isValidInput('Ohjelmoinnin  jatkokurssi')).toBe(false);
        });

        test('should not allow special characters other than dashes', () => {
            expect(kori.isValidInput('Ohjelmoinnin_Jatkokurssi')).toBe(false);
        });
    });
});
