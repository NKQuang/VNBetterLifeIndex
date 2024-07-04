@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0  break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl">
            <h6 class="font-semibold text-white">Quản lý quận huyện</h6>
            <div class="flex items-center">
            <a href="{{ route('districts.create') }}" class="text-blue-600 font-bold py-2 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 mb-2">Thêm mới Quận/Huyện</a>

            </div>
        </div>

        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead class="align-bottom">
                        <tr>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">ID</th>

                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên huyện</th>
                            <th class="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên đầy đủ</th>

                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên quốc tế</th>
                            {{-- <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Mô tả</th> --}}

                            <th class="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($districts as $row)
                        <tr>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->id }}</span>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->name }}</span>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->full_name }}</span>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->full_name_en }}</span>
                            </td>
                            {{-- <td class="p-2 text-center align-middle bg-transparent border-b shadow-transparent  break-words whitespace-normal ">
                                <span class="font-semibold leading-tight text-xs text-slate-400 "> {{ $row->content ?? 'N/A' }}</span>
                            </td> --}}


                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <a href="{{ route('districts.edit', $row->id) }}" class="font-semibold leading-tight text-xs text-blue-400"> Cập nhật </a>
                                <form action="{{ route('districts.destroy', $row->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-semibold leading-tight text-xs text-red-400">
                                        Xóa
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="mt-4 p-2">
                    {{ $districts->links('vendor.pagination.tailwind') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
