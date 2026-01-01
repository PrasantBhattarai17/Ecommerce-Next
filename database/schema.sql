-- E-commerce Database Schema
-- Run this script in SQL Server Management Studio to create the database and tables

-- Create database (if it doesn't exist)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ecommerce_db')
BEGIN
    CREATE DATABASE ecommerce_db
END
GO

USE ecommerce_db
GO

-- Create Users table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Users] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL,
        [Email] NVARCHAR(255) NOT NULL UNIQUE,
        [Password] NVARCHAR(255) NOT NULL,
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 DEFAULT GETDATE()
    )
    
    CREATE INDEX IX_Users_Email ON [dbo].[Users]([Email])
END
GO

-- Create Orders table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Orders] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [OrderId] NVARCHAR(50) NOT NULL UNIQUE,
        [UserId] INT NOT NULL,
        [Total] DECIMAL(10,2) NOT NULL,
        [Status] NVARCHAR(50) DEFAULT 'pending',
        [FirstName] NVARCHAR(100),
        [LastName] NVARCHAR(100),
        [Email] NVARCHAR(255),
        [Phone] NVARCHAR(20),
        [Address] NVARCHAR(500),
        [City] NVARCHAR(100),
        [State] NVARCHAR(100),
        [ZipCode] NVARCHAR(20),
        [Country] NVARCHAR(100),
        [PaymentMethod] NVARCHAR(50),
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE
    )
    
    CREATE INDEX IX_Orders_UserId ON [dbo].[Orders]([UserId])
    CREATE INDEX IX_Orders_OrderId ON [dbo].[Orders]([OrderId])
END
GO

-- Create OrderItems table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[OrderItems]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[OrderItems] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [OrderId] INT NOT NULL,
        [ProductId] INT NOT NULL,
        [ProductName] NVARCHAR(255) NOT NULL,
        [ProductImage] NVARCHAR(500),
        [Price] DECIMAL(10,2) NOT NULL,
        [Quantity] INT NOT NULL,
        [Subtotal] DECIMAL(10,2) NOT NULL,
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders]([Id]) ON DELETE CASCADE
    )
    
    CREATE INDEX IX_OrderItems_OrderId ON [dbo].[OrderItems]([OrderId])
END
GO

PRINT 'Database schema created successfully!'
GO

