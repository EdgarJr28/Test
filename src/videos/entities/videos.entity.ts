
import { Rating } from '../../rating/entities/rating.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

@Entity()
export class Videos {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    title: string;

    @Column({ type: 'varchar', nullable: false })
    url: string;

    @Column({ type: 'varchar', nullable: false })
    user_id: string;

    @Column({ type: 'bool', nullable: false })
    private: boolean;

    @Column({ type: 'bool', nullable: true, default: true })
    status: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true
    })
    upload_date: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    update: Date;


    //Relaciones (FK)
    @OneToMany(() => Rating, rating => rating.video)
    rating: Rating[];
}
