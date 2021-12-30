<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211219103336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE market (id INT AUTO_INCREMENT NOT NULL, loading_date DATETIME NOT NULL, loading_country VARCHAR(255) NOT NULL, loading_zip VARCHAR(255) NOT NULL, loading_town VARCHAR(255) NOT NULL, loading_street VARCHAR(255) NOT NULL, unloading_county VARCHAR(255) NOT NULL, unloading_zip VARCHAR(255) NOT NULL, unloading_town VARCHAR(255) NOT NULL, unloading_street VARCHAR(255) NOT NULL, distance NUMERIC(10, 2) NOT NULL, cargo_weight NUMERIC(10, 2) NOT NULL, cargo_height NUMERIC(10, 2) NOT NULL, cargo_length NUMERIC(10, 2) NOT NULL, cargo_type LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', trailer_type LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', price NUMERIC(10, 2) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE market');
    }
}
