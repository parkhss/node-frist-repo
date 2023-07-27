const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {}
  Member.init(
    {                   
      id: {   // migrations에서 id 복붙
        allowNull: false,  
        autoIncrement: true, 
        primaryKey: true,    
        type: DataTypes.INTEGER, // sequelize -> DataTypes로 수정
      },
      name: DataTypes.STRING,  // 같은이름의 프로펄티가 설정되지 않으면 해당컬럼을 인식할수 없음
      team: DataTypes.STRING,
      position: DataTypes.STRING,
      emailAddress: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      admissionDate: DataTypes.DATE,
      birthday: DataTypes.DATE,
      profileImage: DataTypes.STRING
    }, 
    {
      sequelize,     // sequelize:sequelize와 같은뜻
      modelName: 'Member',
    }
    );
    return Member;
};