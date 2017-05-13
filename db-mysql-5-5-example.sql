
/*
-- Entities
*/
INSERT INTO `Entities` (`ID`,`TypeID`,`UserID`,`Created`,`Deleted`) VALUES (1118888,1878799,1,'2017-05-13 07:41:39',NULL);
INSERT INTO `Entities` (`ID`,`TypeID`,`UserID`,`Created`,`Deleted`) VALUES (1118889,1878802,1,'2017-05-13 08:30:37',NULL);
INSERT INTO `Entities` (`ID`,`TypeID`,`UserID`,`Created`,`Deleted`) VALUES (1118890,1878802,1,'2017-05-13 08:30:37',NULL);

/*
-- EntityAttributes
*/
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118888,'TotalDue','199.99','2017-05-13 07:42:27','2017-05-13 07:42:27',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118888,'IssuedBy','SOME CORP PTY. LTD.','2017-05-13 08:03:33','2017-05-13 08:03:33',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118888,'DateDue','2017-05-30','2017-05-13 08:03:33','2017-05-13 08:04:46',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118889,'TLD','co','2017-05-13 08:32:02','2017-05-13 08:32:02',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118889,'FQDN','3xqt.co','2017-05-13 08:32:02','2017-05-13 08:32:02',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118889,'Registrar','MARCARIA','2017-05-13 08:32:02','2017-05-13 08:32:02',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118890,'TLD','sexy','2017-05-13 08:32:02','2017-05-13 08:32:02',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118890,'FQDN','awesomely.sexy','2017-05-13 08:32:02','2017-05-13 08:32:02',NULL);
INSERT INTO `EntityAttributes` (`EntityID`,`AttributeKey`,`AttributeValue`,`Created`,`Modified`,`Deleted`) VALUES (1118890,'Registrar','MARCARIA','2017-05-13 08:32:02','2017-05-13 08:32:02',NULL);

/*
-- EntityTypes
*/
INSERT INTO `EntityTypes` (`ID`,`UserID`,`ParentID`,`ClassName`,`Slug`,`Label`,`Created`,`Modified`,`Deleted`) VALUES (1878799,1,NULL,'TaxInvoice','tax-invoice','Tax Invoice (expense)','2017-05-13 07:38:09','2017-05-13 07:38:09',NULL);
INSERT INTO `EntityTypes` (`ID`,`UserID`,`ParentID`,`ClassName`,`Slug`,`Label`,`Created`,`Modified`,`Deleted`) VALUES (1878801,1,NULL,'BankAccount','bank-account','Bank Account','2017-05-13 07:38:09','2017-05-13 07:38:09',NULL);
INSERT INTO `EntityTypes` (`ID`,`UserID`,`ParentID`,`ClassName`,`Slug`,`Label`,`Created`,`Modified`,`Deleted`) VALUES (1878802,1,NULL,'DomainName','domain-name','Domain Name','2017-05-13 07:38:09','2017-05-13 07:38:09',NULL);

/*
-- TypeAttributes
*/
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878799,'TotalDue','Total Due',1,'0.00','2017-05-13 07:40:07','2017-05-13 08:23:36',NULL);
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878799,'DateDue','Date Due',1,'','2017-05-13 08:01:18','2017-05-13 08:23:36',NULL);
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878799,'DatePaid','Date Paid',0,'','2017-05-13 08:01:18','2017-05-13 08:23:36',NULL);
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878799,'IssuedBy','Issued By',1,'','2017-05-13 08:01:18','2017-05-13 08:23:36',NULL);
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878802,'TLD','TLD',1,'com','2017-05-13 08:30:01','2017-05-13 08:30:01',NULL);
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878802,'FQDN','FQDN',1,'example.com','2017-05-13 08:30:01','2017-05-13 08:30:01',NULL);
INSERT INTO `TypeAttributes` (`TypeID`,`AttributeKey`,`Label`,`Required`,`DefaultValue`,`Created`,`Modified`,`Deleted`) VALUES (1878802,'Registrar','Registrar',1,NULL,'2017-05-13 08:30:01','2017-05-13 08:30:01',NULL);
