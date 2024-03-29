<?php

namespace App\Entity;


use App\Repository\ScheduleTimeRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScheduleTimeRepository::class)
 */
class ScheduleTime
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\Column(type="array")
     */
    private $departure_time;

    /**
     * @ORM\Column(type="array")
     */
    private $place;

    /**
     * @ORM\Column(type="integer")
     */
    private $scheduleId;

    /**
     * @ORM\Column(type="string")
     */
    private $scheduleName;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_holiday;


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }
    /**
     * @return mixed
     */
    public function getDepartureTime()
    {
        return $this->departure_time;
    }

    /**
     * @param mixed $departure_time
     */
    public function setDepartureTime($departure_time): void
    {
        $this->departure_time = $departure_time;
    }

    /**
     * @return mixed
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * @param mixed $place
     */
    public function setPlace($place): void
    {
        $this->place = $place;
    }

    /**
     * @return mixed
     */
    public function getScheduleId()
    {
        return $this->scheduleId;
    }

    /**
     * @param mixed $scheduleId
     */
    public function setScheduleId($scheduleId): void
    {
        $this->scheduleId = $scheduleId;
    }

    public function getIsHoliday(): ?bool
    {
        return $this->is_holiday;
    }

    public function setIsHoliday(bool $is_holiday): self
    {
        $this->is_holiday = $is_holiday;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getScheduleName()
    {
        return $this->scheduleName;
    }

    /**
     * @param mixed $scheduleName
     */
    public function setScheduleName($scheduleName): void
    {
        $this->scheduleName = $scheduleName;
    }



}