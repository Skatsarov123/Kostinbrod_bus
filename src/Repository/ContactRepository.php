<?php

namespace App\Repository;

use App\Entity\UserContact;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserContact|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserContact|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserContact[]    findAll()
 * @method UserContact[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContactRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserContact::class);
    }

    public function create($data): UserContact
    {
        $schedule = new UserContact();
        $schedule->setName($data->name);
        $schedule->setEmail($data->email);
        $schedule->setPhone($data->phone_number);
        $schedule->setMessage($data->message);



        $this->_em->persist($schedule);
        $this->_em->flush();

        return $schedule;
    }
}