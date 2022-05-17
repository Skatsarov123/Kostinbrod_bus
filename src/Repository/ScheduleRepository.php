<?php

namespace App\Repository;

use App\Entity\Schedule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


/**
 * @method Schedule|null find($id, $lockMode = null, $lockVersion = null)
 * @method Schedule|null findOneBy(array $criteria, array $orderBy = null)
 * @method Schedule[]    findAll()
 * @method Schedule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScheduleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Schedule::class);
    }

    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     * @throws \Exception
     */
    public function create($data): Schedule
    {
        $schedule = new Schedule();
        $schedule->setName($data->name);
        $schedule->setStopslocation($data->stops);



        $this->_em->persist($schedule);
        $this->_em->flush();

        return $schedule;
    }

    public function update($schedule): Schedule
    {
        $this->_em->persist($schedule);
        $this->_em->flush();

        return $schedule;
    }
}
