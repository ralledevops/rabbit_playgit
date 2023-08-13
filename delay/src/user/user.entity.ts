// user.entity.ts
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table
  export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
  
    @Column({ allowNull: false })
    firstName: string;
  
    @Column({ allowNull: false })
    lastName: string;
  
    @Column({ allowNull: false, unique: true })
    email: string;
  
    @Column({ allowNull: false })
    password: string;
  }
  