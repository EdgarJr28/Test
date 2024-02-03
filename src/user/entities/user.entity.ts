
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../common/enums/roles.enum';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    birthdayDate: Date;

    @Column({ type: 'enum', default: Role.USER, enum: Role, nullable: true })
    rol: Role;

    @Column({ type: 'bool', nullable: true, default: true })
    status: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    create: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    update: Date;
}
