<?php

namespace App\Form;

use App\Entity\Market;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MarketType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('loadingDate')
            ->add('loadingCountry')
            ->add('loadingZip')
            ->add('loadingTown')
            ->add('unloadingCounty')
            ->add('unloadingZip')
            ->add('unloadingTown')
            ->add('unloadingStreet')
            ->add('distance')
            ->add('cargoWeight')
            ->add('cargoHeight')
            ->add('cargoLength')
            ->add('cargoType')
            ->add('trailerType')
            ->add('price')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Market::class,
        ]);
    }
}
