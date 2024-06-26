import { Column, Entity } from "typeorm"

@Entity({
    name: 'system_configs',
})
export class SystemConfig {

    @Column({
        primary: true,
        unique: true,
        type: 'varchar'
    })
    slug_name: string

    @Column({
        type: 'varchar'
    })
    title: string

    @Column({
        type: 'varchar'
    })
    value: string
}
