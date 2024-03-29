<?php

namespace App\Entity;

use App\Repository\ScheduleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScheduleRepository::class)
 */
class Schedule
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="array")
     */
    private $stopslocation = [];

    /**
     * @ORM\Column(type="array")
     */
    private $stopsNames = [];

    /**
     * @return array
     */
    public function getStopsNames(): array
    {
        return $this->stopsNames;
    }

    /**
     * @param array $stopsNames
     */
    public function setStopsNames(array $stopsNames): void
    {
        $this->stopsNames = $stopsNames;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStopslocation()
    {
        return $this->stopslocation;
    }

    public function setStopslocation(array $stopslocation): self
    {
        $this->stopslocation = $stopslocation;

        return $this;
    }


}
