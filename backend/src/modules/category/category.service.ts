import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Category} from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['parent', 'children', 'quests'],
    })
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {id},
      relations: ['parent', 'children', 'quests'],
    })

    if (!category) {
      throw new Error(`Category with ID ${id} not found`)
    }

    return category
  }

  create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category)
  }

  async update(id: string, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id)
  }
}
