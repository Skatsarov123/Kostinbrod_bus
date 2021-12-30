<?php

namespace App\Repository;

use App\Entity\Market;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Market|null find($id, $lockMode = null, $lockVersion = null)
 * @method Market|null findOneBy(array $criteria, array $orderBy = null)
 * @method Market[]    findAll()
 * @method Market[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MarketRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Market::class);
    }

    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     */
    public function create($data): Market
    {


        $market = new Market();
        $market->setLoadingDate ($data->loadingDate);
        $market->setLoadingCountry($data->loadingCountry);
        $market->setLoadingTown($data->loadingTown);
        $market->setLoadingZip($data->loadingZip);
        $market->setLoadingStreet($data->loadingStreet);
        $market->setUnloadingCounty($data->unloadingCountry);
        $market->setUnloadingTown($data->unloadingTown);
        $market->setUnloadingZip($data->unloadingZip);
        $market->setUnloadingStreet($data->unloadingStreet);
        $market->setDistanceInKm($data->distanceInKm);
        $market->setPrice($data->price);
        $market->setAuthor($data->token);

        $this->_em->persist($market);
        $this->_em->flush();

        return $market;
    }
}
