<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211229142228 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE market ADD author_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE market ADD CONSTRAINT FK_6BAC85CBF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_6BAC85CBF675F31B ON market (author_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE market DROP FOREIGN KEY FK_6BAC85CBF675F31B');
        $this->addSql('DROP INDEX IDX_6BAC85CBF675F31B ON market');
        $this->addSql('ALTER TABLE market DROP author_id');
    }
}
