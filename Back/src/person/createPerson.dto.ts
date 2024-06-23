import { ApiProperty } from "@nestjs/swagger";
import { IsDate, Length } from "class-validator";

export class CreatePersonDto {
    @Length(2, 20, { message: 'First name length must be between 2 and 20 characters'})
    @ApiProperty({
      description: 'First name length must be between 2 and 20 characters',
      example: 'John'
    })
    first_name: string;
  
    @Length(2, 20, { message: 'Last name length must be between 2 and 20 characters'})
    @ApiProperty({
      description: 'Last name length must be between 2 and 20 characters',
      example: 'Doe'
    })
    last_name: string;
  
    // @IsDate()
    // birthdate: Date;
  
    // @Column({
    //   unique: true,
    // })
    // dni: string;
  
    // @Column()
    // phone: string;
  
    // @Column({
    //   type: 'varchar',
    //   length: 50,
    //   nullable: false,
    //   unique: true,
    // })
    // email: string;
  
    // @Column()
    // address: string;
  
    // @Column()
    // location: string;
  
    // @Column()
    // nationality: string;
  
    // @Column()
    // role: Role;
  
    // @DeleteDateColumn({
    //   nullable: true,
    // })
    // deleteDate?: Date;
  
    // @OneToOne(() => Auth)
    // @JoinColumn({ name: 'auth_id' })
    // auth: Auth | Auth['id'];
  }
  