<?php

namespace App\Controller;


use App\Repository\MarketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/market')]
class MarketController extends AbstractController
{

    public function __construct(
        private MarketRepository      $marketRepository,
        private Security            $security,
        private SerializerInterface $serializer
    )
    {

    }
    #[Route('/all', name: 'market_index', methods: ['GET'])]
    public function index(MarketRepository $marketRepository): Response
    {

        $data = $this->marketRepository->findAll();

        $arrayCollection = array();
        foreach($data as $item) {
            $arrayCollection[] = array(
                'id' => $item->getId(),
                'loadingDate'=>$item->getLoadingDate(),
                'loadingCountry'=>$item->getLoadingCountry(),
                'loadingTown' =>$item->getLoadingTown(),
                'unloadingCountry'=>$item ->getUnloadingCounty(),
                'unloadingTown'=> $item->getUnloadingTown(),
                'distanceInKm' =>$item->getDistanceInKm(),
                'price'=>$item->getPrice()
            );
        }

        return new JsonResponse($arrayCollection);
    }

    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     */
    #[Route('/create', name: 'market_create', methods: ['GET', 'POST'])]
    public function new(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent());


        if($jsonData->token){
        $market = $this->marketRepository->create($jsonData);

        return new JsonResponse([
            'market' => $this->serializer->serialize($market, 'json'),], 201
        );
        }else{
            return new JsonResponse(['massage'=>'user not found']);
        }
    }

    #[Route('/{id}', name: 'market_show', methods: ['GET'])]
    public function show(Market $market): Response
    {
        return $this->render('market/show.html.twig', [
            'market' => $market,
        ]);
    }

    #[Route('/{id}/edit', name: 'market_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Market $market, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(MarketType::class, $market);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('market_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('market/edit.html.twig', [
            'market' => $market,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'market_delete', methods: ['POST'])]
    public function delete(Request $request, Market $market, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$market->getId(), $request->request->get('_token'))) {
            $entityManager->remove($market);
            $entityManager->flush();
        }

        return $this->redirectToRoute('market_index', [], Response::HTTP_SEE_OTHER);
    }
}
