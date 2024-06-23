import * as bcrypt from 'bcrypt';

export const Hash = async (pass: string) => {
  const passHashed = await bcrypt.hash(pass, 10);
  return passHashed;
};
