<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MarketRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MarketRepository::class)
 */
#[ApiResource]
class Market
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
    private $loadingDate;


    /**
     * @ORM\Column(type="string", length=255)
     */
    private $loadingCountry;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $loadingZip;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $loadingTown;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $loadingStreet;



    /**
     * @ORM\Column(type="string", length=255)
     */
    private $unloadingCounty;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $unloadingZip;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $unloadingTown;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $unloadingStreet;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=2)
     */
    private $distanceInKm;


    /**
     * @ORM\Column(type="decimal", precision=10, scale=2)
     */
    private $price;

    /**
     * @ORM\ManyToOne (targetEntity="App\Entity\User", inversedBy="offerOwner")
     */
    private $author;

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author): void
    {
        $this->author = $author;
    }


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
    public function getLoadingDate()
    {
        return $this->loadingDate;
    }

    /**
     * @param mixed $loadingDate
     */
    public function setLoadingDate($loadingDate): void
    {
        $this->loadingDate = $loadingDate;
    }

    /**
     * @return mixed
     */
    public function getLoadingCountry()
    {
        return $this->loadingCountry;
    }

    /**
     * @param mixed $loadingCountry
     */
    public function setLoadingCountry($loadingCountry): void
    {
        $this->loadingCountry = $loadingCountry;
    }

    /**
     * @return mixed
     */
    public function getLoadingZip()
    {
        return $this->loadingZip;
    }

    /**
     * @param mixed $loadingZip
     */
    public function setLoadingZip($loadingZip): void
    {
        $this->loadingZip = $loadingZip;
    }

    /**
     * @return mixed
     */
    public function getLoadingTown()
    {
        return $this->loadingTown;
    }

    /**
     * @param mixed $loadingTown
     */
    public function setLoadingTown($loadingTown): void
    {
        $this->loadingTown = $loadingTown;
    }

    /**
     * @return mixed
     */
    public function getLoadingStreet()
    {
        return $this->loadingStreet;
    }

    /**
     * @param mixed $loadingStreet
     */
    public function setLoadingStreet($loadingStreet): void
    {
        $this->loadingStreet = $loadingStreet;
    }

    /**
     * @return mixed
     */
    public function getUnloadingCounty()
    {
        return $this->unloadingCounty;
    }

    /**
     * @param mixed $unloadingCounty
     */
    public function setUnloadingCounty($unloadingCounty): void
    {
        $this->unloadingCounty = $unloadingCounty;
    }

    /**
     * @return mixed
     */
    public function getUnloadingZip()
    {
        return $this->unloadingZip;
    }

    /**
     * @param mixed $unloadingZip
     */
    public function setUnloadingZip($unloadingZip): void
    {
        $this->unloadingZip = $unloadingZip;
    }

    /**
     * @return mixed
     */
    public function getUnloadingTown()
    {
        return $this->unloadingTown;
    }

    /**
     * @param mixed $unloadingTown
     */
    public function setUnloadingTown($unloadingTown): void
    {
        $this->unloadingTown = $unloadingTown;
    }

    /**
     * @return mixed
     */
    public function getUnloadingStreet()
    {
        return $this->unloadingStreet;
    }

    /**
     * @param mixed $unloadingStreet
     */
    public function setUnloadingStreet($unloadingStreet): void
    {
        $this->unloadingStreet = $unloadingStreet;
    }

    /**
     * @return mixed
     */
    public function getDistanceInKm()
    {
        return $this->distanceInKm;
    }

    /**
     * @param mixed $distanceInKm
     */
    public function setDistanceInKm($distanceInKm): void
    {
        $this->distanceInKm = $distanceInKm;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price): void
    {
        $this->price = $price;
    }




}
