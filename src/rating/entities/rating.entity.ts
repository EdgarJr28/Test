
import { Videos } from 'src/videos/entities/videos.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity()
export class Rating {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'double', nullable: false })
    score: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @Column({ type: 'varchar', nullable: false })
    video_id: string;

    @Column({ type: 'varchar', nullable: true })
    user_id: string;

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

    //relaciones (FK)
    @ManyToOne(() => Videos, video => video.rating)
    @JoinColumn({ name: 'video_id' })
    video: Videos;
}
