<?php

namespace App\Repository;

use App\Entity\ScheduleTime;
use App\Entity\Stops;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Stops|null find($id, $lockMode = null, $lockVersion = null)
 * @method Stops|null findOneBy(array $criteria, array $orderBy = null)
 * @method Stops[]    findAll()
 * @method Stops[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StopsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Stops::class);
    }

    public function create($data): Stops
    {
        $stops = new Stops();


        $stops->setName($data->name);
        $stops->setLatitude($data->latitude);
        $stops->setLongitude($data->longitude);


        $this->_em->persist($stops);
        $this->_em->flush();

        return $stops;
    }

    public function update($stops): ScheduleTime
    {
        $this->_em->persist($stops);
        $this->_em->flush();

        return $stops;
    }
}
