from fastapi import APIRouter

router = APIRouter()

@router.get("")
async def get_info():
    return "ceci est un test"