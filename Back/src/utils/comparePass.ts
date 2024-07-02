import * as bcrypt from 'bcrypt';

export const ComparePass = async (pass: string, passHash: string): Promise<boolean> => {
    const isPassCorrect: boolean = await bcrypt.compare(
        pass,
        passHash
    )
    return isPassCorrect;
}