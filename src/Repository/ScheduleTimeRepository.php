<?php

namespace App\Repository;

use App\Entity\ScheduleTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ScheduleTime|null find($id, $lockMode = null, $lockVersion = null)
 * @method ScheduleTime|null findOneBy(array $criteria, array $orderBy = null)
 * @method ScheduleTime[]    findAll()
 * @method ScheduleTime[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScheduleTimeRepository extends ServiceEntityRepository
{  public function __construct(ManagerRegistry $registry)

{
    parent::__construct($registry, ScheduleTime::class);
}
    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     * @throws \Exception
     */
    public function create($data): ScheduleTime
    {
        $scheduleTime = new ScheduleTime();


        $scheduleTime->setDepartureTime($data->departure_time);
        $scheduleTime->setPlace($data->place);
        $scheduleTime->setScheduleId($data->scheduleId);
        $scheduleTime->setIsHoliday($data->isHoliday);
        $scheduleTime->setScheduleName($data->scheduleName);

        $this->_em->persist($scheduleTime);
        $this->_em->flush();

        return $scheduleTime;
    }

    public function update($scheduleTime): ScheduleTime
    {
        $this->_em->persist($scheduleTime);
        $this->_em->flush();

        return $scheduleTime;
    }
    public function deleteSchedule($scheduleTime):ScheduleTime
    {

        $this->_em->remove($scheduleTime);
        $this->_em->flush();

        return $scheduleTime;
    }
}